using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Store.Migrations
{
    /// <inheritdoc />
    public partial class AddTableFavoriteProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "user_favorite_products",
                schema: "store",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    product_id = table.Column<int>(type: "integer", nullable: false),
                    account_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_favorite_products", x => x.id);
                    table.ForeignKey(
                        name: "fk_user_favorite_products_accounts_account_id",
                        column: x => x.account_id,
                        principalSchema: "store",
                        principalTable: "accounts",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_user_favorite_products_accounts_user_id",
                        column: x => x.user_id,
                        principalSchema: "store",
                        principalTable: "accounts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_user_favorite_products_products_product_id",
                        column: x => x.product_id,
                        principalSchema: "store",
                        principalTable: "products",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_user_favorite_products_account_id",
                schema: "store",
                table: "user_favorite_products",
                column: "account_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_favorite_products_product_id",
                schema: "store",
                table: "user_favorite_products",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_favorite_products_user_id",
                schema: "store",
                table: "user_favorite_products",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "user_favorite_products",
                schema: "store");
        }
    }
}
