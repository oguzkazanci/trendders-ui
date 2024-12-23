import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserDetails } from 'src/app/dto/user-details';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userDetails: UserDetails;
  userOldPassword: string;
  userNewPassword: string;
  userNewPassword2: string;

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
    this.userDetails = new UserDetails();
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe(userDetails => {
      this.userDetails = userDetails;
    });
  }

  changePassword() {
    if (this.userNewPassword != this.userNewPassword2) {
          this.showError("Şifreler eşleşmiyor");
    }
    this.userService.changePassword(this.userOldPassword, this.userNewPassword).subscribe(value => {
        if (value.message == "Şifre Başarıyla Güncellendi!") {
          this.showSuccess(value.message);
        } else {
          this.showError(value.message);
        }
      }
    )
  }
  
  showSuccess(message: string) {
    this.messageService.add({severity:'success', summary: 'Başarılı', detail: message});
  }

  showError(message: string) {
    this.messageService.add({severity:'error', summary: 'Hata', detail: message});
  }

  showInfo() {
    this.messageService.add({severity:'info', summary: 'Bilgi', detail: 'Bilgi mesajı'});
  }

}
