/* eslint-disable no-undef */
import { render } from "@testing-library/react";

import SnapshotExample from "./SnapshotExample";

describe("SnapshotExample", () => {
  test("matches the snapshot", () => {
    const { container } = render(<SnapshotExample />);

    expect(container).toMatchSnapshot();
  });
});