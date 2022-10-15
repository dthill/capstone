import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;

public class Driver {

    private static WebDriver driver;

    private Driver(){
    }

    public static WebDriver getInstance() throws MalformedURLException {
        if(driver == null){
            ChromeOptions chromeOptions = new ChromeOptions();
            driver = new RemoteWebDriver(new URL(Constants.TESTSERVER), chromeOptions);
        }
        return driver;
    }


}
