import { test } from "@playwright/experimental-ct-react";
import { Overlay } from "./Overlay";

test('overlay', async ({ mount }) => {
  const component = await mount(<Overlay />);
  await component.getByRole('button').click();
});