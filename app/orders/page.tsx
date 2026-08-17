export const dynamic = 'force-dynamic';
import { prisma } from '../../lib/prisma';
import OrdersCatalog from './OrdersCatalog';
export default async function OrdersPage() { const orders = await prisma.order.findMany({orderBy:{createdAt:'desc'},include:{author:true,_count:{select:{applications:true}}}}); return <OrdersCatalog orders={JSON.parse(JSON.stringify(orders))}/>; }
