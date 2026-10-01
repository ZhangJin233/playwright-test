import { TodoPage } from "../fixture/todo-page";
import { test } from "../fixture/base/new-todo";
import { expect } from "@playwright/test";

test.beforeEach("open Todo page", async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();
});

test.afterEach("add screenshot", async ({ page }, testInfo) => {
  await testInfo.attach("add screenshot", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
});

test("add new todo", async ({ page }) => {
  const addNewTodo = new TodoPage(page);

  await addNewTodo.addTodo("learn English");

  await expect(addNewTodo.todoTitle).toHaveText("learn English");
});

test("add multiple todo list", async ({ page }) => {
  const addMultipleTodo = new TodoPage(page);

  await addMultipleTodo.addTodo("eating food");

  await addMultipleTodo.addTodo("reading book");

  await expect(addMultipleTodo.todoTitle).toHaveText([
    "eating food",
    "reading book",
  ]);
});

test("click complete button for a todo", async ({ page }) => {
  const completeTodo = new TodoPage(page);

  await completeTodo.addTodo("complete a todo");

  await expect(completeTodo.todoTitle).toHaveText("complete a todo");

  await completeTodo.completeTodo("complete a todo");

  await expect(completeTodo.page.getByTestId("todo-item")).toHaveClass(
    "completed",
  );
});

test("delete a uncompleted todo list", async ({ page }) => {
  const deleteUncompletedTodo = new TodoPage(page);

  await deleteUncompletedTodo.addTodo("delete a uncompleted todo list");

  await expect(deleteUncompletedTodo.todoTitle).toHaveText(
    "delete a uncompleted todo list",
  );

  await deleteUncompletedTodo.deleteTodo("delete a uncompleted todo list");

  await expect(deleteUncompletedTodo.todoTitle).toHaveCount(0);
});

test("select uncompleted todo list", async ({ todoPageWithItems }) => {
  await todoPageWithItems.completeTodo("eating food");

  await todoPageWithItems.showActive();

  await expect(todoPageWithItems.todoTitle).toHaveCount(2);

  await expect(todoPageWithItems.todoTitle).toHaveText([
    "learn English",
    "reading book",
  ]);
});
