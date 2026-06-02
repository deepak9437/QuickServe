package quick.serve.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import quick.serve.entity.ProviderDocEntity;
import quick.serve.entity.ProviderEntity;
import quick.serve.entity.UserEntity;

@Data
@AllArgsConstructor
public class FullProjectDTO {

	private UserEntity userDTO;

	private ProviderEntity pDTO;

	private List<ProviderDocEntity> pdDTO;

}
