using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace client
{
    public partial class index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["UserEmail"] == null)
            {
                Response.Redirect("login.aspx");
            }
            else
            {
                lblUserEmail.Text = Session["UserEmail"].ToString();
            }
        }

        protected void btnLogout_Click(object sender, EventArgs e)
        {
            // Clear the session
            Session.Abandon();
            Session.Clear();

            // Redirect to login page
            Response.Redirect("login.aspx");
        }
    }
}