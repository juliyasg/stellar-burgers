import reducer, {
  registerUser,
  loginUser,
  logoutUser,
  checkUserAuth,
  updateUser
} from "../userSlice";

import { TUser } from "@utils-types";

describe("userSlice", () => {
  const user: TUser = {
    email: "test@example.com",
    name: "Test User"
  };

  it("pending: registerUser → isLoading=true", () => {
    const s = reducer(undefined, registerUser.pending("", {} as any));
    expect(s.isLoading).toBe(true);
    expect(s.error).toBeNull();
  });

  it("fulfilled: registerUser → user записан", () => {
    const s = reducer(undefined, registerUser.fulfilled(user, "", {} as any));
    expect(s.user).toEqual(user);
    expect(s.isAuthChecked).toBe(true);
    expect(s.isLoading).toBe(false);
  });

  it("rejected: registerUser → error заполняется", () => {
    const error = new Error("fail");
    const s = reducer(undefined, registerUser.rejected(error, "", {} as any));
    expect(s.error).toBe("fail");
    expect(s.isLoading).toBe(false);
  });

  it("loginUser.fulfilled обновляет user", () => {
    const s = reducer(undefined, loginUser.fulfilled(user, "", {} as any));
    expect(s.user).toEqual(user);
    expect(s.isAuthChecked).toBe(true);
  });

  it("logoutUser.fulfilled очищает user", () => {
    const filled = {
      user,
      isAuthChecked: true,
      isLoading: false,
      error: null
    };
    const s = reducer(filled as any, logoutUser.fulfilled(undefined, ""));
    expect(s.user).toBeNull();
  });

  it("checkUserAuth.fulfilled пишет user и ставит isAuthChecked=true", () => {
    const s = reducer(
      undefined,
      checkUserAuth.fulfilled(user, "", undefined)
    );

    expect(s.user).toEqual(user);
    expect(s.isAuthChecked).toBe(true);
  });

  it("updateUser.fulfilled обновляет user", () => {
    const prev = { user: null, isAuthChecked: true, isLoading: false, error: null };
    const s = reducer(prev as any, updateUser.fulfilled(user, "", {} as any));
    expect(s.user).toEqual(user);
  });
});
