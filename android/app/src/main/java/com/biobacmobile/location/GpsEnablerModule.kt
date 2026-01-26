package com.biobacmobile.location

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.location.LocationManager
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.android.gms.common.api.ResolvableApiException
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.LocationSettingsRequest
import com.google.android.gms.location.Priority

class GpsEnablerModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  companion object {
    private const val REQUEST_CODE_ENABLE_GPS = 9234
  }

  private var pendingPromise: Promise? = null

  private val listener: ActivityEventListener = object : BaseActivityEventListener() {
    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
      if (requestCode != REQUEST_CODE_ENABLE_GPS) return
      val p = pendingPromise
      pendingPromise = null
      p?.resolve(isLocationEnabled())
    }
  }

  init {
    reactContext.addActivityEventListener(listener)
  }

  override fun getName(): String = "GpsEnabler"

  private fun isLocationEnabled(): Boolean {
    val lm = reactContext.getSystemService(Context.LOCATION_SERVICE) as LocationManager
    return try {
      lm.isProviderEnabled(LocationManager.GPS_PROVIDER) ||
        lm.isProviderEnabled(LocationManager.NETWORK_PROVIDER)
    } catch (_: Exception) {
      false
    }
  }

  @ReactMethod
  fun isEnabled(promise: Promise) {
    promise.resolve(isLocationEnabled())
  }

  /**
   * Shows the system resolution dialog ("Turn on location") when possible.
   * Resolves true if location is enabled after user action, else false.
   */
  @ReactMethod
  fun promptEnable(promise: Promise) {
    if (pendingPromise != null) {
      promise.reject("GPS_PROMPT_IN_PROGRESS", "GPS enable prompt already in progress")
      return
    }

    val activity = reactContext.currentActivity
    if (activity == null) {
      promise.reject("NO_ACTIVITY", "No foreground activity")
      return
    }

    if (isLocationEnabled()) {
      promise.resolve(true)
      return
    }

    pendingPromise = promise

    try {
      val locationRequest =
        LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 1000L)
          .setMinUpdateIntervalMillis(500L)
          .build()

      val settingsRequest =
        LocationSettingsRequest.Builder()
          .addLocationRequest(locationRequest)
          .setAlwaysShow(true)
          .build()

      val client = LocationServices.getSettingsClient(activity)
      client.checkLocationSettings(settingsRequest)
        .addOnSuccessListener {
          val p = pendingPromise
          pendingPromise = null
          p?.resolve(isLocationEnabled())
        }
        .addOnFailureListener { e ->
          if (e is ResolvableApiException) {
            try {
              e.startResolutionForResult(activity, REQUEST_CODE_ENABLE_GPS)
            } catch (ex: Exception) {
              val p = pendingPromise
              pendingPromise = null
              p?.reject("GPS_RESOLUTION_FAILED", ex.message, ex)
            }
          } else {
            val p = pendingPromise
            pendingPromise = null
            p?.resolve(false)
          }
        }
    } catch (e: Exception) {
      val p = pendingPromise
      pendingPromise = null
      p?.reject("GPS_PROMPT_FAILED", e.message, e)
    }
  }
}

