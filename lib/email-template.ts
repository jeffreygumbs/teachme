interface EmailTemplateOptions {
	preheader: string;
	heading: string;
	intro: string;
	body: string;
	footnote?: string;
}

const brandMark = `
	<div style="display:inline-block;width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#38bdf8,#1d4ed8);text-align:center;line-height:44px;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">TM</div>
	<span style="margin-left:10px;font-size:16px;font-weight:600;color:#f1f5f9;vertical-align:middle;">Teach Me</span>`;

const divider = `<div style="height:1px;background-color:#1e293b;margin:28px 0;"></div>`;

export const ctaButton = (label: string, href: string) => `
	<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0;">
		<tr>
			<td align="center" style="border-radius:9999px;background-color:#38bdf8;background-image:linear-gradient(90deg,#38bdf8,#2563eb);">
				<a href="${href}" style="display:inline-block;padding:14px 36px;font-size:15px;font-weight:600;color:#020617;text-decoration:none;border-radius:9999px;">${label}</a>
			</td>
		</tr>
	</table>`;

export const codeBlock = (code: string) => `
	<div style="margin:28px 0;padding:20px;text-align:center;background-color:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.25);border-radius:12px;">
		<span style="font-family:'Courier New',Courier,monospace;font-size:34px;font-weight:700;letter-spacing:10px;color:#7dd3fc;padding-left:10px;">${code}</span>
	</div>`;

export const emailLayout = ({
	preheader,
	heading,
	intro,
	body,
	footnote,
}: EmailTemplateOptions) => `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>${heading}</title>
</head>
<body style="margin:0;padding:0;background-color:#020617;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
	<span style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}</span>
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#020617;padding:48px 16px;">
		<tr>
			<td align="center">
				<table role="presentation" width="520" cellpadding="0" cellspacing="0" style="width:100%;max-width:520px;background-color:#0b1220;border:1px solid #1e293b;border-radius:16px;overflow:hidden;">
					<tr>
						<td style="height:4px;background-color:#38bdf8;background-image:linear-gradient(90deg,#38bdf8,#1d4ed8);font-size:0;line-height:0;">&nbsp;</td>
					</tr>
					<tr>
						<td style="padding:36px 40px;">
							<div style="margin-bottom:28px;">${brandMark}</div>
							<h1 style="margin:0 0 12px;font-size:24px;font-weight:600;color:#f8fafc;line-height:1.3;">${heading}</h1>
							<p style="margin:0;font-size:15px;line-height:1.7;color:#94a3b8;">${intro}</p>
							${body}
							${footnote ? `${divider}<p style="margin:0;font-size:12px;line-height:1.6;color:#64748b;">${footnote}</p>` : ""}
						</td>
					</tr>
				</table>
				<p style="margin:24px 0 0;font-size:12px;color:#475569;">Sent by Teach Me &middot; If you didn't request this email, you can ignore it.</p>
			</td>
		</tr>
	</table>
</body>
</html>`;
