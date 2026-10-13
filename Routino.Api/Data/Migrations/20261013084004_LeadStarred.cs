using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Routino.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class LeadStarred : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Starred",
                table: "BusinessSupportLeads",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Starred",
                table: "BusinessSupportLeads");
        }
    }
}
