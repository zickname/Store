using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Store.Migrations
{
    /// <inheritdoc />
    public partial class renamecolumsfavoriteproducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_user_favorite_products_accounts_account_id",
                schema: "store",
                table: "user_favorite_products");

            migrationBuilder.RenameColumn(
                name: "account_id",
                schema: "store",
                table: "user_favorite_products",
                newName: "account_entity_id");

            migrationBuilder.RenameIndex(
                name: "ix_user_favorite_products_account_id",
                schema: "store",
                table: "user_favorite_products",
                newName: "ix_user_favorite_products_account_entity_id");

            migrationBuilder.AddForeignKey(
                name: "fk_user_favorite_products_accounts_account_entity_id",
                schema: "store",
                table: "user_favorite_products",
                column: "account_entity_id",
                principalSchema: "store",
                principalTable: "accounts",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_user_favorite_products_accounts_account_entity_id",
                schema: "store",
                table: "user_favorite_products");

            migrationBuilder.RenameColumn(
                name: "account_entity_id",
                schema: "store",
                table: "user_favorite_products",
                newName: "account_id");

            migrationBuilder.RenameIndex(
                name: "ix_user_favorite_products_account_entity_id",
                schema: "store",
                table: "user_favorite_products",
                newName: "ix_user_favorite_products_account_id");

            migrationBuilder.AddForeignKey(
                name: "fk_user_favorite_products_accounts_account_id",
                schema: "store",
                table: "user_favorite_products",
                column: "account_id",
                principalSchema: "store",
                principalTable: "accounts",
                principalColumn: "id");
        }
    }
}
