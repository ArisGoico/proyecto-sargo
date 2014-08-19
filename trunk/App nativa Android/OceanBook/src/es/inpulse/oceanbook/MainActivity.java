package es.inpulse.oceanbook;

import android.support.v7.app.ActionBarActivity;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;

/**
 * This activity contains the code for all the fragments used in the application and the flow between them.
 * Right now, an "ActionBarActivity" is used, with the menu in the top of the activity, but 
 * other activities can be used instead.
 */
public class MainActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction()
                    .add(R.id.container, new MainMenuFragment())
                    .commit();
        }
    }


  //------------------------------Métodos propios de ActionBarActivity------------------------------
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

  //------------------------------Fragmentos usados en la actividad---------------------------------
    /**
     * A fragment containing the main menu. This fragment contains a title and 3 buttons right now,
     * each one of them replacing the main fragment with a different one.
     */
    public static class MainMenuFragment extends Fragment {

        public MainMenuFragment() {
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_main, container, false);
            return rootView;
        }
    }
    
    /**
     * A fragment containing a simple list view. This fragment contains right now a ListView that
     * will contain the Vertebrates list from the app.
     */
    public static class View1Fragment extends Fragment {

        public View1Fragment() {
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_list1, container, false);
            return rootView;
        }
    }
    
    /**
     * A fragment containing a simple list view. This fragment contains right now a ListView that
     * will contain the Invertebrates list from the app.
     */
    public static class View2Fragment extends Fragment {

        public View2Fragment() {
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_list2, container, false);
            return rootView;
        }
    }
    
    /**
     * A fragment containing a simple list view. This fragment contains right now a ListView that
     * will contain the Ecosystems list from the app.
     */
    public static class View3Fragment extends Fragment {

        public View3Fragment() {
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_list3, container, false);
            return rootView;
        }
    }
    
  //------------------------------Métodos disparados por los botones--------------------------------
    
    /**
     * This method is triggered when the user clicks in the "Vertebrates" button of the main menu.
     * @param view The view that calls for this event to occur.
     */
    public void button1clicked(View view) {
    	//Do things when button 1 pressed
    	
    	// Create fragment and give it an argument specifying the article it should show
    	View1Fragment newFragment = new View1Fragment();
    	Bundle args = new Bundle();
    	newFragment.setArguments(args);

    	FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();

    	// Replace whatever is in the fragment_container view with this fragment,
    	// and add the transaction to the back stack so the user can navigate back
    	transaction.replace(R.id.container, newFragment);
    	transaction.addToBackStack(null);

    	// Commit the transaction
    	transaction.commit();
    }
    
    /**
     * This method is triggered when the user clicks in the "Invertebrates" button of the main menu.
     * @param view The view that calls for this event to occur.
     */
	public void button2clicked(View view) {
		//Do things when button 2 pressed
		// Create fragment and give it an argument specifying the article it should show
    	View2Fragment newFragment = new View2Fragment();
    	Bundle args = new Bundle();
    	newFragment.setArguments(args);

    	FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();

    	// Replace whatever is in the fragment_container view with this fragment,
    	// and add the transaction to the back stack so the user can navigate back
    	transaction.replace(R.id.container, newFragment);
    	transaction.addToBackStack(null);

    	// Commit the transaction
    	transaction.commit();
	}

	/**
     * This method is triggered when the user clicks in the "Ecosystems" button of the main menu.
     * @param view The view that calls for this event to occur.
     */
	public void button3clicked(View view) {
		//Do things when button 3 pressed
		// Create fragment and give it an argument specifying the article it should show
    	View3Fragment newFragment = new View3Fragment();
    	Bundle args = new Bundle();
    	newFragment.setArguments(args);

    	FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();

    	// Replace whatever is in the fragment_container view with this fragment,
    	// and add the transaction to the back stack so the user can navigate back
    	transaction.replace(R.id.container, newFragment);
    	transaction.addToBackStack(null);

    	// Commit the transaction
    	transaction.commit();
	}

}
