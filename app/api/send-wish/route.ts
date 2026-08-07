import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Resend API error: RESEND_API_KEY is missing.');
    return NextResponse.json({ error: 'Не задан RESEND_API_KEY. Пожалуйста, проверьте .env.local.' }, { status: 500 });
  }

  try {
    const { wish, note } = await request.json();
    if (!wish) {
      return NextResponse.json({ error: 'Желание не может быть пустым.' }, { status: 400 });
    }

    const toEmail = process.env.TO_EMAIL;
    if (!toEmail) {
      console.error('Resend API error: TO_EMAIL is missing.');
      return NextResponse.json({ error: 'Не задан TO_EMAIL. Пожалуйста, проверьте .env.local.' }, { status: 500 });
    }

    const fromEmail = process.env.FROM_EMAIL || 'birthday@magic.com';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: 'Новое желание на день рождения',
        html: `<div style="font-family: system-ui, sans-serif; color: #111;">
          <h1>Новое желание</h1>
          <p><strong>Желание:</strong> ${wish}</p>
          <p><strong>Письмо:</strong> ${note || '—'}</p>
        </div>`
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API failed:', response.status, response.statusText, errorText);
      return NextResponse.json(
        {
          error: 'Не удалось отправить желание.',
          details: `Resend API responded with ${response.status} ${response.statusText}: ${errorText}`
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend request exception:', error);
    const message = error instanceof Error ? error.message : 'Не удалось отправить желание.';
    return NextResponse.json({ error: `Ошибка сервера: ${message}` }, { status: 500 });
  }
}
