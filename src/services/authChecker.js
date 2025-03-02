import { usePoolsStore } from '../../stores/poolsStore';

export async function checkAuthInitData() {
  const poolsStore = usePoolsStore();

  if (!localStorage.getItem('access_token')) {
    console.log('Access token not found. Redirecting to login.');
    return false;
  }

  try {
    console.log('Initializing data for authenticated user...');
    await Promise.all([poolsStore.fetchAllPools()]);
    console.log('All data initialized successfully.');
    return true;
  } catch (error) {
    console.error('Error initializing data:', error);
    return false;
  }
}
