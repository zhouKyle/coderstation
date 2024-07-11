import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getType } from "../api/type";
export const getTypeList = createAsyncThunk(
  "type/getTypeList",
  async (_, action) => {
    const response = await getType();

    // 填充返回的数据到状态仓库
    return response.data;
  }

  //旧的写法
  // async (_, thunkApi) => {
  //   const response = await getType();
  //   console.log(response);
  //   thunkApi.dispatch(getTp(response.data));
  // }
);

export const typeSlice = createSlice({
  name: "type",
  initialState: {
    typeList: [],
  },
  reducers: {
    // getTp: (state, { payload }) => {
    //   state.typeList.push(...payload);
    // },
  },
  //处理 异步reducer
  extraReducers: (builder) => {
    builder.addCase(getTypeList.fulfilled, (state, { payload }) => {
      state.typeList.push(...payload);
    });
  },
  //有三种状态 pending/fulfilled/rejected
  // [getTypeList.fulfilled]: (state, { payload }) => {
  //   state.typeList = payload;
  // },
});

// export const { getTp } = typeSlice.actions;
export default typeSlice.reducer;
