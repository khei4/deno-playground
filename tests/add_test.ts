// add_test.ts
import { assertEquals } from "https://deno.land/std@0.203.0/assert/mod.ts";
import { add } from "../src/add.ts";

Deno.test("add adds two numbers", () => {
  assertEquals(add(1, 2), 3);
});
