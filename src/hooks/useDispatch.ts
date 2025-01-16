import { useDispatch as dispatchHook } from 'react-redux';
import { AppDispatch } from '../utils/types';

export const useDispatch = () => dispatchHook<AppDispatch>();
