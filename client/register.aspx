<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="register.aspx.cs" Inherits="client.register" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title>Register</title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <h2>Register</h2>
            <label>Username:</label>
            <asp:TextBox ID="txtUsername" runat="server" /><br />
            <label>Email:</label>
            <asp:TextBox ID="txtEmail" runat="server" /><br />
            <label>Contact Number:</label>
            <asp:TextBox ID="txtContactNumber" runat="server" /><br />
            <label>Password:</label>
            <asp:TextBox ID="txtPassword" runat="server" TextMode="Password" /><br />
            <asp:Button ID="btnRegister" runat="server" Text="Register" OnClick="btnRegister_Click" />
        </div>
    </form>
</body>
</html>
