using System;
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
            return View();
        }

        [HttpGet]
        public List<TychoLevel1> GetTychoLevel1()
        {
            //context is the bridge between your code and the database!- via Jacob
            //this returns a javascript array that includes every object in Tycho 1!
            return context.TychoLevel1.ToList();
            
        }
       
        //this method queries the data from TychoLevel2 for Chart #1//
        public List<TychoLevel2> GetTychoLevel2ChartData([FromBody]TychoLevel2 data) {

            List<TychoLevel2> QueryResults = context.TychoLevel2.Where(tl => tl.year == data.year).ToList();
            QueryResults = QueryResults.Where(d => d.disease == data.disease).ToList();
            QueryResults = QueryResults.Where(s => s.state == data.state).ToList();
            QueryResults = QueryResults.Where(et => et.event_type == "CASES").ToList();
            return QueryResults;

            //I need to group these by WEEK for my graphs!
        }



        //this method queries the data from TychoLevel2 for Chart #2//
        public List<TychoLevel2> GetTychoLevel2ChartDataDeath([FromBody]TychoLevel2 data)
        {

            List<TychoLevel2> QueryResults = context.TychoLevel2.Where(tl => tl.year == data.year).ToList();
            QueryResults = QueryResults.Where(d => d.disease == data.disease).ToList();
            QueryResults = QueryResults.Where(s => s.state == data.state).ToList();
            QueryResults = QueryResults.Where(et => et.event_type == "DEATHS").ToList();
            return QueryResults;
        }

        //this method queries the data from TychoLevel1 for Chart #3//
        public List<TychoLevel1> GetTychoLevel1ChartData([FromBody]TychoLevel1 data)
        {

            List<TychoLevel1> QueryResults = context.TychoLevel1.Where(tl => tl.year == data.year).ToList();
            QueryResults = QueryResults.Where(d => d.disease == data.disease).ToList();
            QueryResults = QueryResults.Where(s => s.state == data.state).ToList();
            return QueryResults;
        }

       

        public async Task<IActionResult> Graph1()
        {
            ////TODO: Here is where I will get the data to load the first graph.
            var data = await context.TychoLevel2.Take(10).ToListAsync();
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
