using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PokemonReviewApp.Migrations
{
    /// <inheritdoc />
    public partial class ThirdCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cities_States_StateId1",
                table: "Cities");

            migrationBuilder.DropForeignKey(
                name: "FK_Owners_Countries_CountryId1",
                table: "Owners");

            migrationBuilder.DropForeignKey(
                name: "FK_States_Countries_CountryId1",
                table: "States");

            migrationBuilder.DropIndex(
                name: "IX_States_CountryId1",
                table: "States");

            migrationBuilder.DropIndex(
                name: "IX_Owners_CountryId1",
                table: "Owners");

            migrationBuilder.DropIndex(
                name: "IX_Cities_StateId1",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "CountryId1",
                table: "States");

            migrationBuilder.DropColumn(
                name: "CountryId1",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "StateId1",
                table: "Cities");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CountryId1",
                table: "States",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CountryId1",
                table: "Owners",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StateId1",
                table: "Cities",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_States_CountryId1",
                table: "States",
                column: "CountryId1");

            migrationBuilder.CreateIndex(
                name: "IX_Owners_CountryId1",
                table: "Owners",
                column: "CountryId1");

            migrationBuilder.CreateIndex(
                name: "IX_Cities_StateId1",
                table: "Cities",
                column: "StateId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_States_StateId1",
                table: "Cities",
                column: "StateId1",
                principalTable: "States",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Owners_Countries_CountryId1",
                table: "Owners",
                column: "CountryId1",
                principalTable: "Countries",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_States_Countries_CountryId1",
                table: "States",
                column: "CountryId1",
                principalTable: "Countries",
                principalColumn: "Id");
        }
    }
}
