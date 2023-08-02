using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.Context
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions option):base (option)
        {

        }
        public DbSet<TeacherModel> Teacher{ get; set; }
    }
}
