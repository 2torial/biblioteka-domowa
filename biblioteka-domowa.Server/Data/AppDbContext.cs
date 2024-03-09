using Microsoft.EntityFrameworkCore;

namespace ASP.NET_store_project.Server.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .Property(b => b.IsAdmin)
                .HasDefaultValue(false);

            modelBuilder.Entity<User>().HasData(
                new("user", "user"),
                new("root", "root", true));
        }

        public DbSet<User> Users { get; set; }
    }
}
