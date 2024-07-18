using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Store.Migrations
{
    /// <inheritdoc />
    public partial class renamecolumnname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_user_favorite_products_accounts_account_entity_id",
                schema: "store",
                table: "user_favorite_products");

            migrationBuilder.DropIndex(
                name: "ix_user_favorite_products_account_entity_id",
                schema: "store",
                table: "user_favorite_products");

            migrationBuilder.DropColumn(
                name: "account_entity_id",
                schema: "store",
                table: "user_favorite_products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "account_entity_id",
                schema: "store",
                table: "user_favorite_products",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_user_favorite_products_account_entity_id",
                schema: "store",
                table: "user_favorite_products",
                column: "account_entity_id");

            migrationBuilder.AddForeignKey(
                name: "fk_user_favorite_products_accounts_account_entity_id",
                schema: "store",
                table: "user_favorite_products",
                column: "account_entity_id",
                principalSchema: "store",
                principalTable: "accounts",
                principalColumn: "id");
        }
    }
}
