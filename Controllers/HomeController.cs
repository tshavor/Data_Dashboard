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

        //this method queries the data from TychoLevel2 for Chart #1//works!
        [HttpPost]
        [Produces("application/json")]
        public JsonResult GetTychoLevel2ChartData([FromBody]TychoLevel2 data)
        {

            //public List<TychoLevel2> GetTychoLevel2ChartData([FromBody]TychoLevel2 data)
            //{

            //List<TychoLevel2> QueryResults = context.TychoLevel2.Where(tl => tl.year == data.year).ToList();
            //QueryResults = QueryResults.Where(d => d.disease == data.disease).ToList();
            //QueryResults = QueryResults.Where(s => s.state == data.state).ToList();
            //QueryResults = QueryResults.Where(et => et.event_type == "CASES").ToList();

            //QueryResults.GroupBy(wk => wk.week);
            ////QueryResults = QueryResults.SelectMany(d => d.disease, wk => wk.week, n => n.number);
            //return QueryResults;

            ////TODO: replace hard coded year and state with user select version!

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
                                               Disease = ww.Select(d => d.disease),
                                               NumberPerWeek = (ww.Select(n => n.number)).Sum(),
                                               Week = ww.Select(w => w.week),
                                           });

            //number = ww.Select(n => n.number)

            //}).ToList();

            //should be able to order in the original link but would f
            var orderedData = GetTychoLevel2ChartData.OrderBy(w => w.Week);


            return Json(GetTychoLevel2ChartData);
           
        }

        //now, I need to take the value of week and numberperweek and figure out how to put them in a d3 graph


        //this method queries the data from TychoLevel2 for Chart #2//works!
        public List<TychoLevel2> GetTychoLevel2ChartDataDeath([FromBody]TychoLevel2 data) {

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
            //var data = await context.TychoLevel2.Take(10).ToListAsync();
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
