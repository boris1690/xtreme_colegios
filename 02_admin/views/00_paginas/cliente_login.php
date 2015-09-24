<!DOCTYPE html>
<html>
<head>
	<title>BOA</title>
	<link rel="stylesheet" href="<?php echo base_url()?>css/style_login.css" type="text/css">

</head>

<body bgcolor="#ffffff" topmargin="0" marginheight="0" leftmargin="0" marginwidth="0" onResize="makeLiquid()">
<form method="post" action="#">

<table cellpadding="0" cellspacing="0" width="100%" height="100%" border="0">

<tr>
	<td colspan="2" rowspan="2" valign="bottom">
        <table border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td><img src="<?php echo base_url()?>images/gr_login_01.jpg" width="549" height="198" border="0" alt=""></td>
        </tr>
        <tr>
            <td><img src="<?php echo base_url()?>images/gr_login_02.jpg" width="549" height="182" border="0" alt=""></td>
        </tr>
        <tr>
            <td><img src="<?php echo base_url()?>images/gr_login_03.jpg" width="549" height="220" border="0" alt=""></td>
        </tr>
        </table>
    </td>
	<td align="center" valign="middle" height="100%"><br><br><br><img src="<?php echo base_url()?>images/gr_login_logo.jpg" width="303" height="134" border="0" alt=""></td>
	<td bgcolor="#80bd01" rowspan="2"><img src="<?php echo base_url()?>images/gr_blank.gif" width="20" height="1" border="0" alt=""></td>
</tr>
<tr>
	<td valign="bottom" align="center" width="100%">
		<table cellpadding="0" cellspacing="0" border="0" height="182">
		<tr>
			<td height="100%" style="color:757578;font-size:18px;" align="center" width="340">Bienvenido al nuevo sistema de CLIPPING en linea de BOA Comunicaciones<br><br><br></td>
		</tr>
		<tr>
			<td height="19" valign="bottom" align="center"><img src="<?php echo base_url()?>images/gr_login_04.jpg" width="340" height="19" border="0" alt=""></td>
		</tr>
		<tr>
			<td align="center" width="340" bgcolor="#dededf">
				<table cellpadding="0" cellspacing="0" border="0" width="250" height="220" bgcolor="#dededf">
				<tr>
					<td style="color:757578;" align="center" valign="top">Por favor, ingresa tu usuario y contrase&ntilde;a para que puedas acceder al contenido</td>
				</tr>
				<tr>
					<td style="font-weight:bold;">Usuario:</td>
				</tr>
				<tr>
					<td><input type="text" name="Usuario" value="" size="37" maxlength="30" class="textbox" required></td>
				</tr>
				<tr>
					<td style="font-weight:bold;">Contrase&ntilde;a:</td>
				</tr>
				<tr>
					<td><input type="password" name="Password" value="" size="37" maxlength="30" class="textbox" required="required"></td>
				</tr>
				<tr>
					<td align="right" valign="bottom"><a href="<?php echo base_url()?>index.php/navigate_controller/pages/cliente_frame"><img src="<?php echo base_url()?>images/bt_login_ingresar.png" width="91" height="24" border="0" alt=""></a></td>
				</tr>
				</table>
			</td>
		</tr>
		</table>
	</td>
</tr>

<tr>
	<td height="120" width="200" align="center" valign="bottom" bgcolor="#295133" style="color:#fafafa;padding-bottom:5px;font-size:11px;">BOA Comunicaciones<br>&copy; Copyright - 2015</td>
	<td height="120" bgcolor="#767577"><img src="<?php echo base_url()?>images/gr_blank.gif" width="38" height="1" border="0" alt=""></td>
	<td height="120" bgcolor="#767577" colspan="2"><img src="<?php echo base_url()?>images/gr_blank.gif" width="38" height="1" border="0" alt=""></td>
</tr>

</table>

</form>
</body>
</html>