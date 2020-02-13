import { NativeModules } from 'react-native';

const { RNFitnessTracker } = NativeModules;

export interface IStepTrackerStatus {
  authorized: boolean;
  shouldOpenAppSettings: boolean;
}

export interface IWeekDailySteps {
  [key: string]: number;
}

export interface IStepTrackerData {
  stepsToday: number;
  stepsThisWeek: IWeekDailySteps;
}

const iosAuthorizationStatusCheck = (status: string): IStepTrackerStatus => {
  if (status === 'authorized') {
    return { authorized: true, shouldOpenAppSettings: false };
  } else if (status === 'notDetermined') {
    return { authorized: false, shouldOpenAppSettings: false };
  } else {
    return { authorized: false, shouldOpenAppSettings: true };
  }
};

export const isStepTrackingSupported = (): Promise<boolean> =>
  new Promise(resolve => {
    RNFitnessTracker.isStepTrackingSupported((available: number) => {
      resolve(available === 1 ? true : false);
    });
  });

export const isStepTrackingAvailableAndroid = (): Promise<IStepTrackerStatus> =>
  new Promise(resolve => {
    RNFitnessTracker.authorize((authorized: boolean) => {
      resolve({ authorized, shouldOpenAppSettings: false });
    });
  });

export const isStepTrackingAvailableIOS = (): Promise<IStepTrackerStatus> =>
  new Promise(resolve => {
    RNFitnessTracker.isAuthorizedToUseCoreMotion((status: string) => {
      resolve(iosAuthorizationStatusCheck(status));
    });
  });

export const isStepTrackingAvailable = (): Promise<IStepTrackerStatus> =>
  new Promise(resolve => {
    if (global.isIOS) {
      RNFitnessTracker.isAuthorizedToUseCoreMotion((status: string) => {
        resolve(iosAuthorizationStatusCheck(status));
      });
    } else {
      RNFitnessTracker.authorize((authorized: boolean) => {
        resolve({ authorized, shouldOpenAppSettings: false });
      });
    }
  });

export const setupStepTracking = (): Promise<IStepTrackerStatus> =>
  new Promise(resolve => {
    RNFitnessTracker.authorize((authorized: boolean) => {
      if (!global.isIOS) {
        resolve({ authorized, shouldOpenAppSettings: false });
      } else {
        RNFitnessTracker.isAuthorizedToUseCoreMotion((status: string) => {
          resolve(iosAuthorizationStatusCheck(status));
        });
      }
    });
  });

export const getStepsToday = (): Promise<number> =>
  new Promise(resolve => {
    RNFitnessTracker.getStepsToday((steps: number) => {
      resolve(steps);
    });
  });

export const getStepsThisWeek = (): Promise<number> =>
  new Promise(resolve => {
    RNFitnessTracker.getWeekData((steps: number) => {
      resolve(steps);
    });
  });

export const getWeeklySteps = (): Promise<IWeekDailySteps> =>
  new Promise(resolve => {
    RNFitnessTracker.getDailyWeekData((data: IWeekDailySteps) => {
      resolve(data);
    });
  });

export const getSteps = (): Promise<IStepTrackerData> =>
  new Promise(resolve => {
    RNFitnessTracker.getStepsToday((steps: number) => {
      RNFitnessTracker.getDailyWeekData((data: IWeekDailySteps) => {
        if (data) {
          resolve({ stepsToday: steps, stepsThisWeek: data });
        } else {
          resolve({ stepsToday: steps, stepsThisWeek: {} });
        }
      });
    });
  });