using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace presentserver.Data.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    CarId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CarBrand = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    CarModel = table.Column<string>(type: "TEXT", maxLength: 100000, nullable: false),
                    CarYear = table.Column<int>(type: "INTEGER", maxLength: 100, nullable: false),
                    CarDescription = table.Column<string>(type: "TEXT", maxLength: 100000, nullable: false),
                    CarImgUrl = table.Column<string>(type: "TEXT", maxLength: 100000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.CarId);
                });

            migrationBuilder.InsertData(
                table: "Cars",
                columns: new[] { "CarId", "CarBrand", "CarDescription", "CarImgUrl", "CarModel", "CarYear" },
                values: new object[,]
                {
                    { 1, "Audi", "Good car", "https://www.topgear.com/sites/default/files/cars-car/image/2021/03/audiuk0002282120audi20a420saloon.jpg", "A4", 2012 },
                    { 2, "Audi", "Good car", "https://www.topgear.com/sites/default/files/cars-car/image/2021/03/audiuk0002282120audi20a420saloon.jpg", "A4", 2012 },
                    { 3, "Audi", "Good car", "https://www.topgear.com/sites/default/files/cars-car/image/2021/03/audiuk0002282120audi20a420saloon.jpg", "A4", 2012 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cars");
        }
    }
}
