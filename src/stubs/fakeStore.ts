import { create } from 'zustand';
import { random } from 'lodash';
import { COIN_TYPES_CONFIG } from "../config";

// Constants
const COIN_CONFIG = {
  [COIN_TYPES_CONFIG.USDC_COIN_TYPE]: {
    display_name: "USDC",
    image_url: "/coins/usdc.png",
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
  },
  [COIN_TYPES_CONFIG.NDLP_COIN_TYPE]: {
    display_name: "NDLP",
    image_url: "/coins/ndlp.png",
    decimals: 9,
    symbol: "NDLP",
    name: "NODO LP Token",
  },
};

// 24-hour cooldown in milliseconds
const WITHDRAWAL_COOLDOWN = 86400000;

// Types
export interface UserCoinAsset {
  coin_type: string;
  coin_object_id: string;
  balance: number;
  raw_balance: number;
  image_url: string;
  decimals: number;
  display_name: string;
  name: string;
  symbol: string;
}

export interface ActivityItem {
  id: string;
  type: 'deposit' | 'withdraw' | 'claim';
  amount: number;
  timestamp: number;
  vaultId: string;
  status: 'completed' | 'pending';
  txHash: string;
}

export type ActRow = {
  id: string;
  timestamp: number;           // epoch ms
  type: 'Add' | 'Remove' | 'Swap';
  vault: string;               // 0x7d83…6d75
  token: 'USDC' | 'SUI' | 'NDLP';
  value: number;               // USD worth
  tx: string;                  // 0x hash
};

export interface PendingWithdrawal {
  id: string;
  amount: number;
  vaultId: string;
  timestamp: number;
  unlockTime: number;
  txHash: string;
}

interface FakeStoreState {
  assets: UserCoinAsset[];
  activity: ActivityItem[];
  act: ActRow[];
  pendingWithdrawals: PendingWithdrawal[];
  vaultBalances: Record<string, number>;
}

interface FakeStoreActions {
  deposit: (vaultId: string, amount: number, lockupPeriod: number) => Promise<void>;
  withdraw: (vaultId: string, amount: number) => Promise<void>;
  claim: (withdrawalId: string) => Promise<void>;
  reset: () => void;
  refreshBalance: () => void;
  pushRandomActivity: () => void;
}

// Helper functions
const generateTxHash = () => {
  const prefix = '0x';
  const chars = '0123456789abcdef';
  const hash = Array.from({ length: 64 }, () => 
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
  return `${prefix}${hash}`;
};

const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper functions for Activity Feed
const generateAddress = () => {
  return '0x' + Math.random().toString(36).substring(2, 6) + '…' +
         Math.random().toString(36).substring(2, 6);
};

const txHash = () => generateTxHash();

// Function to create a random activity row
const createRandomActivityRow = (timestamp?: number): ActRow => {
  const types = ['Add', 'Remove', 'Swap'] as const;
  const tokens = ['USDC', 'SUI', 'NDLP'] as const;
  
  return {
    id: generateId(),
    timestamp: timestamp || Date.now(),
    type: types[Math.floor(Math.random() * types.length)],
    vault: generateAddress(),
    token: tokens[Math.floor(Math.random() * tokens.length)],
    value: Number((Math.random() * 4000 + 50).toFixed(2)),   // 50 – 4050
    tx: txHash(),
  };
};

// Function to create seed data with older timestamps
const createSeedActivityRows = (count: number): ActRow[] => {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => {
    // Spread out timestamps: older ones 5-90 min apart, newer ones 1-5 min apart
    const ageInMinutes = i < count/2 
      ? i * 5 + Math.floor(Math.random() * 5) // newer items (1-5 min apart)
      : i * 15 + Math.floor(Math.random() * 15); // older items (15-30 min apart)
      
    return createRandomActivityRow(now - ageInMinutes * 60 * 1000);
  });
};

// Create the store
const useFakeStore = create<FakeStoreState & FakeStoreActions>((set, get) => ({
  // Initial state
  assets: [
    {
      coin_type: COIN_TYPES_CONFIG.USDC_COIN_TYPE,
      coin_object_id: 'fake-usdc-coin-object-id',
      balance: 100000,
      raw_balance: 100000000000, // 100,000 with 6 decimals
      image_url: COIN_CONFIG[COIN_TYPES_CONFIG.USDC_COIN_TYPE].image_url,
      decimals: COIN_CONFIG[COIN_TYPES_CONFIG.USDC_COIN_TYPE].decimals,
      display_name: COIN_CONFIG[COIN_TYPES_CONFIG.USDC_COIN_TYPE].display_name,
      name: COIN_CONFIG[COIN_TYPES_CONFIG.USDC_COIN_TYPE].name,
      symbol: COIN_CONFIG[COIN_TYPES_CONFIG.USDC_COIN_TYPE].symbol,
    },
    {
      coin_type: COIN_TYPES_CONFIG.NDLP_COIN_TYPE,
      coin_object_id: 'fake-ndlp-coin-object-id',
      balance: 100000,
      raw_balance: 100000000000000, // 100,000 with 9 decimals
      image_url: COIN_CONFIG[COIN_TYPES_CONFIG.NDLP_COIN_TYPE].image_url,
      decimals: COIN_CONFIG[COIN_TYPES_CONFIG.NDLP_COIN_TYPE].decimals,
      display_name: COIN_CONFIG[COIN_TYPES_CONFIG.NDLP_COIN_TYPE].display_name,
      name: COIN_CONFIG[COIN_TYPES_CONFIG.NDLP_COIN_TYPE].name,
      symbol: COIN_CONFIG[COIN_TYPES_CONFIG.NDLP_COIN_TYPE].symbol,
    },
  ],
  activity: [],
  // Initialize with seed activity data (35 rows)
  act: createSeedActivityRows(35),
  pendingWithdrawals: [],
  vaultBalances: {},

  // Actions
  deposit: async (vaultId, amount, lockupPeriod) => {
    // Validate amount
    const usdcAsset = get().assets.find(asset => 
      asset.coin_type === COIN_TYPES_CONFIG.USDC_COIN_TYPE
    );
    
    if (!usdcAsset || usdcAsset.balance < amount) {
      throw new Error('Insufficient balance');
    }

    // Simulate network delay (600-1000ms)
    await delay(random(600, 1000));

    // Update state
    set(state => {
      // Update USDC balance
      const updatedAssets = state.assets.map(asset => {
        if (asset.coin_type === COIN_TYPES_CONFIG.USDC_COIN_TYPE) {
          return {
            ...asset,
            balance: asset.balance - amount,
            raw_balance: asset.raw_balance - (amount * Math.pow(10, asset.decimals)),
          };
        }
        return asset;
      });

      // Create activity item
      const newActivity: ActivityItem = {
        id: generateId(),
        type: 'deposit',
        amount,
        timestamp: Date.now(),
        vaultId,
        status: 'completed',
        txHash: generateTxHash(),
      };

      // Update vault balance
      const currentVaultBalance = state.vaultBalances[vaultId] || 0;
      
      return {
        ...state,
        assets: updatedAssets,
        activity: [newActivity, ...state.activity],
        vaultBalances: {
          ...state.vaultBalances,
          [vaultId]: currentVaultBalance + amount,
        },
      };
    });
  },

  withdraw: async (vaultId, amount) => {
    // Validate amount
    const currentVaultBalance = get().vaultBalances[vaultId] || 0;
    
    if (currentVaultBalance < amount) {
      throw new Error('Insufficient vault balance');
    }

    // Simulate network delay (600-1000ms)
    await delay(random(600, 1000));

    // Create pending withdrawal
    const withdrawalId = generateId();
    const now = Date.now();
    const unlockTime = now + WITHDRAWAL_COOLDOWN; // 24 hours
    const txHash = generateTxHash();

    // Update state
    set(state => {
      // Create activity item
      const newActivity: ActivityItem = {
        id: generateId(),
        type: 'withdraw',
        amount,
        timestamp: now,
        vaultId,
        status: 'pending',
        txHash,
      };

      // Create pending withdrawal
      const newPendingWithdrawal: PendingWithdrawal = {
        id: withdrawalId,
        amount,
        vaultId,
        timestamp: now,
        unlockTime,
        txHash,
      };

      // Update vault balance
      return {
        ...state,
        activity: [newActivity, ...state.activity],
        pendingWithdrawals: [...state.pendingWithdrawals, newPendingWithdrawal],
        vaultBalances: {
          ...state.vaultBalances,
          [vaultId]: currentVaultBalance - amount,
        },
      };
    });

    return withdrawalId;
  },

  claim: async (withdrawalId) => {
    // Find pending withdrawal
    const pendingWithdrawal = get().pendingWithdrawals.find(w => w.id === withdrawalId);
    
    if (!pendingWithdrawal) {
      throw new Error('Withdrawal not found');
    }

    // Check if unlock time has been reached
    const now = Date.now();
    if (pendingWithdrawal.unlockTime > now) {
      throw new Error('Withdrawal still locked');
    }

    // Simulate network delay (600-1000ms)
    await delay(random(600, 1000));

    // Update state
    set(state => {
      // Update USDC balance
      const updatedAssets = state.assets.map(asset => {
        if (asset.coin_type === COIN_TYPES_CONFIG.USDC_COIN_TYPE) {
          return {
            ...asset,
            balance: asset.balance + pendingWithdrawal.amount,
            raw_balance: asset.raw_balance + (pendingWithdrawal.amount * Math.pow(10, asset.decimals)),
          };
        }
        return asset;
      });

      // Create activity item
      const newActivity: ActivityItem = {
        id: generateId(),
        type: 'claim',
        amount: pendingWithdrawal.amount,
        timestamp: Date.now(),
        vaultId: pendingWithdrawal.vaultId,
        status: 'completed',
        txHash: generateTxHash(),
      };

      // Update activity status for the original withdrawal
      const updatedActivity = state.activity.map(item => {
        if (item.txHash === pendingWithdrawal.txHash && item.type === 'withdraw') {
          return {
            ...item,
            status: 'completed',
          };
        }
        return item;
      });

      // Remove from pending withdrawals
      const filteredPendingWithdrawals = state.pendingWithdrawals.filter(
        w => w.id !== withdrawalId
      );

      return {
        ...state,
        assets: updatedAssets,
        activity: [newActivity, ...updatedActivity],
        pendingWithdrawals: filteredPendingWithdrawals,
      };
    });
  },

  reset: () => {
    set({
      assets: [
        {
          coin_type: COIN_TYPES_CONFIG.USDC_COIN_TYPE,
          coin_object_id: 'fake-usdc-coin-object-id',
          balance: 100000,
          raw_balance: 100000000000, // 100,000 with 6 decimals
          image_url: COIN_CONFIG[COIN_TYPES_CONFIG.USDC_COIN_TYPE].image_url,
          decimals: COIN_CONFIG[COIN_TYPES_CONFIG.USDC_COIN_TYPE].decimals,
          display_name: COIN_CONFIG[COIN_TYPES_CONFIG.USDC_COIN_TYPE].display_name,
          name: COIN_CONFIG[COIN_TYPES_CONFIG.USDC_COIN_TYPE].name,
          symbol: COIN_CONFIG[COIN_TYPES_CONFIG.USDC_COIN_TYPE].symbol,
        },
        {
          coin_type: COIN_TYPES_CONFIG.NDLP_COIN_TYPE,
          coin_object_id: 'fake-ndlp-coin-object-id',
          balance: 100000,
          raw_balance: 100000000000000, // 100,000 with 9 decimals
          image_url: COIN_CONFIG[COIN_TYPES_CONFIG.NDLP_COIN_TYPE].image_url,
          decimals: COIN_CONFIG[COIN_TYPES_CONFIG.NDLP_COIN_TYPE].decimals,
          display_name: COIN_CONFIG[COIN_TYPES_CONFIG.NDLP_COIN_TYPE].display_name,
          name: COIN_CONFIG[COIN_TYPES_CONFIG.NDLP_COIN_TYPE].name,
          symbol: COIN_CONFIG[COIN_TYPES_CONFIG.NDLP_COIN_TYPE].symbol,
        },
      ],
      activity: [],
      pendingWithdrawals: [],
      vaultBalances: {},
    });
  },

  refreshBalance: () => {
    // This is a no-op function that just triggers reactivity
    set(state => ({ ...state }));
  },
  
  pushRandomActivity: () => {
    set(state => {
      // Create a new random activity row
      const newRow = createRandomActivityRow();
      
      // Add to the beginning of the array and limit to the latest 200 items
      const updatedAct = [newRow, ...state.act].slice(0, 200);
      
      return { act: updatedAct };
    });
  },
}));

// Export the store
export default useFakeStore;