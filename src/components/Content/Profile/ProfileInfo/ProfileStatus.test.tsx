import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status should be in the state", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("it-kamasutra");
  });

  test("afler creaction span should be displayed with correct status", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span).not.toBeNull();
  });

  test("afler creaction input should not be displayed", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const root = component.root;
    expect(() => {
      const input = root.findByType("input");
    }).toThrow();
  });

  test("afler creaction span should be contains correct status", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span.innerText).toBe("it-kamasutra");
  });

  test("afler creaction span children shoud be it-kamasutra", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span.children[0]).toBe("it-kamasutra");
  });

  test("input should be displayed in EditMode instead of span", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const root = component.root;
    const span = root.findByType("span");
    span.props.onDoubleClick();
    const input = root.findByType("input");
    expect(input.props.value).toBe("it-kamasutra");
  });

  test("callback should be called", () => {
    const mockCallback = jest.fn();
    const component = create(<ProfileStatus status="it-kamasutra" updateStatus={mockCallback} />);
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
