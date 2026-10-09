using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Routino.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class BusinessSupportLeads : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BusinessSupportLeads",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: true),
                    JobTitle = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Mobile = table.Column<string>(type: "TEXT", maxLength: 11, nullable: false),
                    Instagram = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    OtherSocials = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessSupportLeads", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BusinessSupportLeads_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSupportLeads_CreatedAt",
                table: "BusinessSupportLeads",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSupportLeads_Mobile",
                table: "BusinessSupportLeads",
                column: "Mobile");

            migrationBuilder.CreateIndex(
                name: "IX_BusinessSupportLeads_UserId",
                table: "BusinessSupportLeads",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BusinessSupportLeads");
        }
    }
}
