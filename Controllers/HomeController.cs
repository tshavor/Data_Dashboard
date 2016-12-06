using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Data_Dashboard.Data;
using Data_Dashboard.Models;

namespace Data_Dashboard.Controllers
{
    public class HomeController : Controller
    {

        private Data_DashboardContext context;

        public HomeController(Data_DashboardContext ctx)
        {
            context = ctx;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Graph1()
        {
            ////TODO: Here is where I will get the data to load the first graph.
            var data = context.TychoLevel2.Take(10).ToList();
            return View("Graph1");
        }

        public IActionResult Graph2()
        {
            ////TODO: Here is where I will get the data to load the first graph.
            return View("Graph2");
        }

        public IActionResult Graph3()
        {
            ////TODO: Here is where I will get the data to load the first graph.
            return View("Graph3");
        }

        public IActionResult About()
        {
           // ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
