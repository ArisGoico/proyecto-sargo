/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.example.sargo;

import android.os.Bundle;
import android.os.Handler;
import android.widget.LinearLayout;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;

import org.apache.cordova.*;

public class ProyectoSargo extends CordovaActivity 
{
	private static final String AdMob_Ad_Unit = "ca-app-pub-1002564116074691/6872022360";
    private Handler mHandler = new Handler();
    private AdView adView;
    
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.init();
        // Set by <content src="index.html" /> in config.xml
        //super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl(Config.getStartUrl());
        //super.loadUrl("file:///android_asset/www/index.html");
        
        mHandler.postDelayed(new Runnable() {
            public void run() {
                doAdMob();
            }
        }, 60000);
    }

    private void doAdMob() {
        // Create the adView
    	adView = new AdView(this);
        adView.setAdUnitId(AdMob_Ad_Unit);
        adView.setAdSize(AdSize.SMART_BANNER );
        
        // Lookup your LinearLayout - get the super.root
        LinearLayout layout = super.root;
        // Add the adView to it
        layout.addView(adView);
        // This centers the ads in landscape mode.        
        layout.setHorizontalGravity(android.view.Gravity.CENTER_HORIZONTAL);
        
        // Iniciar una solicitud genérica.
        AdRequest adRequest = new AdRequest.Builder()
        	.addTestDevice(AdRequest.DEVICE_ID_EMULATOR)       // Emulator
        	.addTestDevice("2DF4498BBEEB17F93CE2857BDC6489A2") // Samsung Galaxy S3 de Aris
        	.build();
        
        // Cargar adView con la solicitud de anuncio.
        adView.loadAd(adRequest);
                          
    }
    /*
    @Override
    public void onPause() {
      adView.pause();
      super.onPause();
    }

    @Override
    public void onResume() {
      super.onResume();
      adView.resume();
    }

    @Override
    public void onDestroy() {
      adView.destroy();
      super.onDestroy();
    }
    */
}

