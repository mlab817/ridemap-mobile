<<<<<<< HEAD:android/app/src/main/java/com/mlab817/ridemapqr/MainApplication.java
package com.mlab817.ridemapqr;
=======
package com.mlab817.ridemapcounter;
>>>>>>> 87bece223ab04b78886b4c9be4569b8454e18ec3:android/app/src/main/java/com/mlab817/ridemapcounter/MainApplication.java

import android.app.Application;
import android.content.Context;
import android.content.res.Configuration;
import androidx.annotation.NonNull;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.soloader.SoLoader;
<<<<<<< HEAD:android/app/src/main/java/com/mlab817/ridemapqr/MainApplication.java
import com.mlab817.ridemapqr.newarchitecture.MainApplicationReactNativeHost;
=======
import com.mlab817.ridemapcounter.newarchitecture.MainApplicationReactNativeHost;
>>>>>>> 87bece223ab04b78886b4c9be4569b8454e18ec3:android/app/src/main/java/com/mlab817/ridemapcounter/MainApplication.java

import expo.modules.ApplicationLifecycleDispatcher;
import expo.modules.ReactNativeHostWrapper;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new ReactNativeHostWrapper(
    this,
    new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  });

  private final ReactNativeHost mNewArchitectureNativeHost =
      new ReactNativeHostWrapper(this, new MainApplicationReactNativeHost(this));

  @Override
  public ReactNativeHost getReactNativeHost() {
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      return mNewArchitectureNativeHost;
    } else {
      return mReactNativeHost;
    }
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // If you opted-in for the New Architecture, we enable the TurboModule system
    ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    SoLoader.init(this, /* native exopackage */ false);

    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    ApplicationLifecycleDispatcher.onApplicationCreate(this);
  }

  @Override
  public void onConfigurationChanged(@NonNull Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
<<<<<<< HEAD:android/app/src/main/java/com/mlab817/ridemapqr/MainApplication.java
        Class<?> aClass = Class.forName("com.mlab817.ridemapqr.ReactNativeFlipper");
=======
        Class<?> aClass = Class.forName("com.mlab817.ridemapcounter.ReactNativeFlipper");
>>>>>>> 87bece223ab04b78886b4c9be4569b8454e18ec3:android/app/src/main/java/com/mlab817/ridemapcounter/MainApplication.java
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
