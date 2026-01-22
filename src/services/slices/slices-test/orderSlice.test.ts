import reducer, { createOrder, clearOrder } from '../orderSlice';
import { TOrder } from '@utils-types';

const order: TOrder = {
  _id: 'id',
  status: 'done',
  number: 777,
  name: 'Test',
  ingredients: [],
  createdAt: '',
  updatedAt: ''
};

describe('orderSlice', () => {
  it('pending ставит orderRequest = true', () => {
    const state = reducer(undefined, createOrder.pending('', []));
    expect(state.orderRequest).toBe(true);
  });

  it('fulfilled ставит orderRequest=false и записывает order', () => {
    const payload = {
      success: true,
      name: 'Test order',
      order
    };

    const state = reducer(
      undefined,
      createOrder.fulfilled(payload, '', [])
    );

    expect(state.order).toEqual(order);
    expect(state.orderRequest).toBe(false);
  });

  it('rejected ставит orderFailed = true', () => {
    const s = reducer(undefined, createOrder.rejected(new Error(), '', []));
    expect(s.orderFailed).toBe(true);
  });

  it('clearOrder очищает order', () => {
    const filled = { order, orderRequest: false, orderFailed: false };
    const s = reducer(filled as any, clearOrder());
    expect(s.order).toBe(null);
    expect(s.orderFailed).toBe(false);
    expect(s.orderRequest).toBe(false);
  });
});
