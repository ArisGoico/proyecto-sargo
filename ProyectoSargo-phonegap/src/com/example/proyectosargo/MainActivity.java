package com.example.proyectosargo;

import android.os.Bundle;
import org.apache.cordova.*;
import android.view.Menu;
import com.google.ads.*;
import android.widget.LinearLayout;
import android.os.Handler;

public class MainActivity extends DroidGap {
	
	private static final String AdMob_Ad_Unit = "ca-app-pub-1002564116074691/6872022360";
    private Handler mHandler = new Handler();
    private AdView adView;
    /** Called when the activity is first created. */
    
    @Override    
    public void onCreate(Bundle savedInstanceState) {
    	super.onCreate(savedInstanceState);
		//super.loadUrl("file:///android_asset/www/index.html");
		super.setIntegerProperty("splashscreen", R.drawable.splash);
		super.loadUrl("file:///android_asset/www/index_list.html", 10000);

        mHandler.postDelayed(new Runnable() {
            public void run() {
                doAdMob();
            }
        }, 3000);
    }

    private void doAdMob() {
        // Create the adView
        adView = new AdView(this, AdSize.BANNER, AdMob_Ad_Unit);
        // Lookup your LinearLayout - get the super.root
        LinearLayout layout = super.root;
        // Add the adView to it
        layout.addView(adView);
        // This centers the ads in landscape mode.        
        layout.setHorizontalGravity(android.view.Gravity.CENTER_HORIZONTAL);
        // Initiate a generic request to load it with an ad
        AdRequest request = new AdRequest();
        request.addTestDevice(AdRequest.TEST_EMULATOR);
        adView.loadAd(request);                    
    }
    
    @Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}
}
