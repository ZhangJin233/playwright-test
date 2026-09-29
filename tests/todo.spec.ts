import { test, expect } from "@playwright/test";

test.beforeEach("open Todo page", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test.afterEach("add screenshot", async ({ page }, testInfo) => {
  await testInfo.attach("add screenshot", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
});

test("add new todo", async ({ page }) => {
  const newTodo = page.getByPlaceholder("What needs to be done?");

  await newTodo.fill("learn English");

  await newTodo.press("Enter");

  await expect(page.getByTestId("todo-title")).toHaveText("learn English");
});

test("add multiple todos", async ({ page }) => {
  const newTodo = page.getByPlaceholder("What needs to be done?");

  await newTodo.fill("eating food");

  await newTodo.press("Enter");

  await newTodo.fill("reading book");

  await newTodo.press("Enter");

  await expect(page.getByTestId("todo-title")).toHaveText([
    "eating food",
    "reading book",
  ]);
});

test("click complete button for a todo", async ({ page }) => {
  const newTodo = page.getByPlaceholder("What needs to be done?");

  await newTodo.fill("complete a todo");

  await newTodo.press("Enter");

  await expect(page.getByTestId("todo-title")).toHaveText("complete a todo");

  const completeTodo = page
    .getByTestId("todo-item")
    .filter({ hasText: "complete a todo" });

  await completeTodo.getByRole("checkbox").check();

  await expect(page.getByTestId("todo-item")).toHaveClass("completed");
});

test("select uncompleted todo list", async ({ page }) => {
  const newTodo = page.getByPlaceholder("What needs to be done?");

  await newTodo.fill("uncompleted todo list 1");

  await newTodo.press("Enter");

  await newTodo.fill("uncompleted todo list 2");

  await newTodo.press("Enter");

  await newTodo.fill("completed todo list");

  await newTodo.press("Enter");

  const completeTodo = page
    .getByTestId("todo-item")
    .filter({ hasText: /^completed todo list$/ });

  await completeTodo.getByRole("checkbox").check();

  const activeButton = page.getByText("Active");

  await activeButton.click();

  await expect(page.getByTestId("todo-item")).toHaveCount(2);

  await expect(page.getByTestId("todo-title")).toHaveText([
    "uncompleted todo list 1",
    "uncompleted todo list 2",
  ]);
});

test("delete a uncompleted todo list", async ({ page }) => {
  const newTodo = page.getByPlaceholder("What needs to be done?");

  await newTodo.fill("delete a uncompleted todo list");

  await newTodo.press("Enter");

  const todo = page.getByTestId("todo-item").filter({
    hasText: /^delete a uncompleted todo list$/,
  });

  await todo.hover()

  const deleteTodo = page.getByRole("button");

  await deleteTodo.click();

  await expect(page.getByTestId("todo-title")).toHaveCount(0);
});
