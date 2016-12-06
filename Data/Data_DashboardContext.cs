using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Data_Dashboard.Models;

namespace Data_Dashboard.Data
{
    public class Data_DashboardContext: DbContext
    {
        public Data_DashboardContext(DbContextOptions<Data_DashboardContext> options)
            : base(options)
        { }

        // What tables are you interacting with in this context class?
        public DbSet<TychoLevel1> TychoLevel1 { get; set; }
        public DbSet<TychoLevel2> TychoLevel2 { get; set; }
        
    }

}


        
