using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Data_Dashboard.Data;
using Data_Dashboard.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Data_Dashboard.Controllers
{
    public class HomeController : Controller
    {

        private Data_DashboardContext context;

        public HomeController(Data_DashboardContext ctx)
        {
            context = ctx;
        }
        public async Task<IActionResult> Index()
        {
            var data = await context.TychoLevel2.Take(10).ToListAsync();
            return View();
        }

        public async Task<IActionResult> Graph1()
        {
            ////TODO: Here is where I will get the data to load the first graph.
            var data =await context.TychoLevel2.Take(10).ToListAsync();
            Debug.WriteLine("This program has stopped running!");
            return View("Graph1");
        }

        public async Task<IActionResult> Graph2()
        {
            ////TODO: Here is where I will get the data to load the first graph.
            return View("Graph2");
        }

        public async Task<IActionResult> Graph3()
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
