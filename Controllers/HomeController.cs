using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Data_Dashboard.Data;
using Data_Dashboard.Models;
using Data_Dashboard.Views.View_Model;

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

        //this method queries the data from TychoLevel2 for Chart #1//
        [HttpPost]
        [Produces("application/json")]
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

        //this method queries the data from TychoLevel2 for Chart #2//re-writng for Graph #2
        [HttpPost]
        [Produces("application/json")]
        public IActionResult GetTychoLevel2ChartDataDeath ([FromBody] TychoLevel2 data)
        {
            string disease = data.disease;
            string state = data.state;

            var GetTychoLevel2ChartDataDeath = (from t in context.TychoLevel2
                                           where t.state == state
                                           && t.disease == disease
                                           && t.event_type == "DEATHS"
                                                group t by t.year into ww
                                                select new
                                           {
                                                    Disease = ww.Select(di => di.disease),
                                                    NumberPerYear = (ww.Select(n => n.number)).Sum(),
                                                    Year = ww.Select(t => t.year),
                                                    
                                                       });
            
            var orderedData = GetTychoLevel2ChartDataDeath.OrderBy(y => y.Year);  //"Year MUST be capitolized!//
            return Json(GetTychoLevel2ChartDataDeath);  //Object RETURNED!
        }

        public IActionResult About()
        {
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
