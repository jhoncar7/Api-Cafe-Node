

const emailTemplate = (email, code, title) => {

    let titulo = 'registrarse en una cuenta de Movike ';
    if (title === 'PASSWORD')
        titulo = 'cambiar la contraseña de tu cuenta de Movike ';

    return (
        `
    <div style="margin:0;padding:0" dir="ltr" bgcolor="#ffffff">
        <table border="0" cellspacing="0" cellpadding="0" align="center" id="m_-7650884979018722939email_table"
            style="border-collapse:collapse">
            <tbody>
                <tr>
                    <td id="m_-7650884979018722939email_content"
                        style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff">
                        <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                            <tbody>
                                <tr>
                                    <td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td height="1" colspan="3" style="line-height:1px"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table border="0" width="100%" cellspacing="0" cellpadding="0"
                                            style="border-collapse:collapse;text-align:center;width:100%">
                                            <tbody>
                                                <tr>
                                                    <td width="15px" style="width:15px"></td>
                                                    <td style="line-height:0px;max-width:600px;padding:0 0 15px 0">
                                                        <table border="0" width="100%" cellspacing="0" cellpadding="0"
                                                            style="border-collapse:collapse">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width:100%;text-align:left;height:33px"><img
                                                                            height="33"
                                                                            src="https://ci4.googleusercontent.com/proxy/H-WMBt20rSRWwIK0YLwC8Uyi1mnXWEEEiUT0twBA78N4_Rbri9VuqAL_Azd6xVjLkSiTQ6r1RjyDJ2Hx1O_3UqLo4H_LxG1o8LHL4yDfZw=s0-d-e1-ft#https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/QTa-gpOyYBa.png"
                                                                            style="border:0" class="CToWUd"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td width="15px" style="width:15px"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table border="0" width="430" cellspacing="0" cellpadding="0"
                                            style="border-collapse:collapse;margin:0 auto 0 auto">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table border="0" width="430px" cellspacing="0" cellpadding="0"
                                                            style="border-collapse:collapse;margin:0 auto 0 auto;width:430px">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="15" style="display:block;width:15px">
                                                                        &nbsp;&nbsp;&nbsp;</td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="12" style="display:block;width:12px">
                                                                        &nbsp;&nbsp;&nbsp;</td>
                                                                    <td>
                                                                        <table border="0" width="100%" cellspacing="0"
                                                                            cellpadding="0"
                                                                            style="border-collapse:collapse">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td></td>
                                                                                    <td
                                                                                        style="margin:10px 0 10px 0;color:#565a5c;font-size:18px">
                                                                                        <p
                                                                                            style="margin:10px 0 10px 0;color:#565a5c;font-size:18px">
                                                                                            Hola,</p>
                                                                                        <p
                                                                                            style="margin:10px 0 10px 0;color:#565a5c;font-size:18px">
                                                                                            Alguien esta intentando ${titulo} con <a
                                                                                                href="mailto:${email}"
                                                                                                target="_blank">${email}</a>.
                                                                                            Si fuiste vos ingresa este codigo de confirmación en la aplicación app:
                                                                                        </p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td></td>
                                                                                    <td
                                                                                        style="padding:10px;color:#565a5c;font-size:32px;font-weight:500;text-align:center;padding-bottom:25px">
                                                                                        ${code}</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table border="0" cellspacing="0" cellpadding="0"
                                            style="border-collapse:collapse;margin:0 auto 0 auto;width:100%;max-width:600px">
                                            <tbody>
                                                <tr>
                                                    <td height="4" style="line-height:4px" colspan="3">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td width="15px" style="width:15px"></td>
                                                    <td width="20" style="display:block;width:20px">&nbsp;&nbsp;&nbsp;</td>
                                                    <td style="text-align:center">
                                                        <div style="padding-top:10px;display:flex">
                                                            <div style="margin:auto"><img
                                                                    src="https://ci6.googleusercontent.com/proxy/qcxWyiNttq1SUI9KktQ8hI_nMTMPyqkAuSqUbz3pGlTIVGhf37JdyjXToZmO0o9wmkj86r7MIve6qRoZsHiB238xnyEjFEimQXN_EFAbmA=s0-d-e1-ft#https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/EK_fa82Ffa5.png"
                                                                    height="26" width="52" alt="" class="CToWUd"></div><br>
                                                        </div>
                                                        <div style="height:10px"></div>
                                                        <div style="color:#abadae;font-size:11px;margin:0 auto 5px auto">©
                                                            Instagram. Meta Platforms, Inc., 1601 Willow Road, Menlo Park,
                                                            CA 94025<br></div>
                                                        <div style="color:#abadae;font-size:11px;margin:0 auto 5px auto">
                                                            This message was sent to <a
                                                                style="color:#abadae;text-decoration:underline">${email}</a>.<br>
                                                        </div>
                                                    </td>
                                                    <td width="20" style="display:block;width:20px">&nbsp;&nbsp;&nbsp;</td>
                                                    <td width="15px" style="width:15px"></td>
                                                </tr>
                                                <tr>
                                                    <td height="32" style="line-height:32px" colspan="3">&nbsp;</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
                                </tr>
                            </tbody>
                        </table><span><img
                                src="https://ci3.googleusercontent.com/proxy/IO08w6NqM60SnsjX8DMsoh2mL_8SPu8vo0dd1ez8giOEUjAI7cQm6cwqDxFxTLlrfmQOiDgMygT4UMRlrzK-3jQaYT-WGYV35yiCVW7IIt4zS6ZVBxk3r3pC253ecZosmbWgcRdrdySxlsdg3RH_gZaUOOb1=s0-d-e1-ft#https://www.facebook.com/email_open_log_pic.php?mid=5e3518732e829G24bc2cdafa4000G5e351d0c8eafcG37f"
                                style="border:0;width:1px;height:1px" class="CToWUd"></span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `);
}

module.exports = {
    emailTemplate
};