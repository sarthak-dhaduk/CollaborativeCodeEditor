using Microsoft.AspNetCore.Mvc;

namespace CollaborativeCodeEditor.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
