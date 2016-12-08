﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Data_Dashboard.Data;
using Data_Dashboard.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Data_Dashboard.Views.View_Model;

namespace Data_Dashboard.Controllers
{
    public class HomeController : Controller
    {

        private Data_DashboardContext context;

        public HomeController(Data_DashboardContext ctx)
        {
            context = ctx;
        }
        //this defines the view.  When runs, it looks for the index file within the Home folder.  It then looks for a 
        //    a file with a method name called Index".
        public async Task<IActionResult> Index()
        {
            //this creates a instance of a viewmodel.
            Index model = new Index();
            
            var data = await context.TychoLevel2.Take(10).ToListAsync();
            model.TychoLevel2 = data;
            var TychoLevel1data= await context.TychoLevel1.Take(10).ToListAsync();
            model.TychoLevel1 = TychoLevel1data;
            return View(model);
        }
        [HttpGet]
        public List<TychoLevel1> GetTychoLevel1()
        {
            //context is the bridge between your code and the database!- via Jacob
            return context.TychoLevel1.ToList();


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
            ViewData["Message"] = "Contact Information:";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
