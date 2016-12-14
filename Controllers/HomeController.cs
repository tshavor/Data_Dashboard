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
using System.Collections;

namespace Data_Dashboard.Controllers
{
   public class HomeController : Controller
    {
        private Data_DashboardContext context;
        public HomeController(Data_DashboardContext ctx)
        {
        //context is the bridge between your code and the database!- via Jacob
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

        //this method queries the data from TychoLevel2 for Chart #1//works!
        [HttpPost]
        [Produces("application/json")]
        //[Route("Home/GetTychoLevel2ChartData/{y}/{d}/{s}")]
        public IActionResult GetTychoLevel2ChartData([FromBody] TychoLevel2 data)
        {
            string  year = data.year;
            string disease = data.disease;
            string state = data.state;

            var GetTychoLevel2ChartData = (from t in context.TychoLevel2
                                           where t.year == year
                                           && t.state == state
                                           && t.disease == disease
                                           && t.event_type == "CASES"
                                           group t by t.week into ww
                                           select new
                                           {
                                               Disease = ww.Select(di => di.disease),
                                               NumberPerWeek = (ww.Select(n => n.number)).Sum(),
                                               Week = ww.Select(w => w.week),
                                           });

            var orderedData = GetTychoLevel2ChartData.OrderBy(w => w.Week);
            return Json(GetTychoLevel2ChartData);  //this dataset resides in the browser in memory, because the call came from the browser originally!
            
        }

        
        [HttpPost]
        [Produces("application/json")]
        public JsonResult GetTychoLevel2ChartDataDeath([FromBody]TychoLevel2 data)
        {
            string year = data.year;
            string disease = data.disease;
            string state = data.state;

            var GetTychoLevel2ChartDataDeath = (from t in context.TychoLevel2
                                           where t.year == year
                                           && t.state == state
                                           && t.disease == disease
                                           && t.event_type == "DEATHS"
                                           group t by t.week into ww
                                           select new
                                           {
                                               Disease = ww.Select(d => d.disease),
                                               NumberPerWeek = (ww.Select(n => n.number)).Sum(),
                                               Week = ww.Select(w => w.week),
                                           });

            var orderedData = GetTychoLevel2ChartDataDeath.OrderBy(w => w.Week);
            return Json(GetTychoLevel2ChartDataDeath);
        }

        //this method queries the data from TychoLevel1 for Chart #3//
        [HttpPost]
        [Produces("application/json")]
        public JsonResult GetTychoLevel1ChartData([FromBody]TychoLevel1 data)
        {
            string year = data.year;
            string disease = data.disease;
            string state = data.state;

            var GetTychoLevel1ChartData = (from t in context.TychoLevel1
                                           where t.year == year
                                           && t.state == state
                                           && t.disease == disease
                                           group t by t.week into ww
                                           select new
                                          
                                           {
                                               Disease = ww.Select(d => d.disease),
                                               ////TODO: FIX this formula below...////
                                               //NumberPerWeek = (ww.Select(n => n.number)).Sum(),
                                               Week = ww.Select(w => w.week),
                                           });

            var orderedData = GetTychoLevel1ChartData.OrderBy(w => w.Week);
            return Json(GetTychoLevel1ChartData);
        }
        
        //-------------------------------------------------------------------------
        public async Task<IActionResult> Graph1()
        {
            ////TODO: Here is where I will get the data to load the first graph.
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
