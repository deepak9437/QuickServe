package quick.serve.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import quick.serve.dto.ProviderDTO;
import quick.serve.service.MainService;

@RestController
@RequestMapping("/view")
public class ViewDetails {

    @Autowired
    private MainService mainService;

    @GetMapping("/all")
    public List<ProviderDTO> getAllProviders() {
        return mainService.getAllProviders();
    }
}
