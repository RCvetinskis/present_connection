using Microsoft.EntityFrameworkCore;

namespace present_server.Data
{
    internal sealed class AppDbContext : DbContext
    {
        public DbSet<Car> Cars { get; set; }

        //route to new db file
        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDb.db");

        //creates default cars
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Car[] CarsToSeed = new Car[3];

            for (int i = 1; i <= 3; i++)
            {
                CarsToSeed[i - 1] = new Car
                {
                    CarId = i,
                    CarBrand = "Audi",
                    CarModel = "A4",
                    CarYear = 2012,
                    CarDescription = "Good car",
                    CarImgUrl = "https://www.topgear.com/sites/default/files/cars-car/image/2021/03/audiuk0002282120audi20a420saloon.jpg"
                };
            }

            modelBuilder.Entity<Car>().HasData(CarsToSeed);


        }
    }
}

