using Microsoft.EntityFrameworkCore;
using System;

namespace present_server.Data
{
    internal static class PostsRepository
    {



        internal async static Task<List<Car>> CarsPerPage(int page, int rowsPerPage)
        {

            using (var db = new AppDbContext())
            {
                return await db.Cars.ToListAsync();
            }
        }

        internal async static Task<int> GetCarsAsync()
        {
            using (var db = new AppDbContext())
            {
                return await db.Cars.CountAsync();
            }
        }



        internal async static Task<Car> GetCarByIdAsync (int carId)
        {
            using (var db = new AppDbContext())
            {
#pragma warning disable CS8603 // Possible null reference return.
                return await db.Cars.FirstOrDefaultAsync(car => car.CarId == carId);
#pragma warning restore CS8603 // Possible null reference return.

            }
        }

        internal async static Task<bool> CreatePostAsync(Car carToCreate)
        {
            using (var db = new AppDbContext())
            {
                try
                {
                    await db.Cars.AddAsync(carToCreate);

                    //if amount of changes is more then or equl 1 save changes
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                  
                    return false;
                }

            }
        }

        internal async static Task<bool> UpdatePostAsync(Car carToCreate)
        {
            using (var db = new AppDbContext())
            {
                try
                {
                     db.Cars.Update(carToCreate);

                    //if amount of changes is more then or equl 1 save changes
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {

                    return false;
                }

            }
        }


        internal async static Task<bool> DeletePostAsync(int postId)
        {
            using (var db = new AppDbContext())
            {
                try
                {
                  Car carToDelete = await GetCarByIdAsync(postId);

                    db.Remove(carToDelete);

                    //if amount of changes is more then or equl 1 save changes
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {

                    return false;
                }

            }
        }



    }


}