import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

import {
  wsConnect,
  wsDisconnect
} from '../../services/slices/profileOrdersSlice';

import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.profileOrders.orders ?? []);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);

  useEffect(() => {
    if (!isAuthChecked) return;

    dispatch(wsConnect());

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch, isAuthChecked]);

  return <ProfileOrdersUI orders={orders} />;
};
