import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'
import { TechProfileAPIService } from '../_services/tech-profile-api.service';
import { UserTechProfileModelService } from '../_services/user-tech-profile-model.service';
import { UserService } from '../_services/user.service';

import { TechProfileModelService } from '../_services/tech-profile-model.service';

import { environment } from '../../_environments/environment';

@Component({
  selector: 'app-user-tech-profile',
  templateUrl: './user-tech-profile.page.html',
  styleUrls: ['./user-tech-profile.page.scss'],
})
export class UserTechProfilePage implements OnInit {

  	userId = undefined;
  	user = undefined;
  	techProfile = undefined;

  	funcKey = "utp-controller";

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _functionPromiseService: FunctionPromiseService,
		    private _techProfileModelService: TechProfileModelService,
			private _userTechProfileModel: UserTechProfileModelService,
		    private _userService: UserService,
		    private _alertService: AlertService ) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
           self.userId = params['userId'] * 1;

           // self._userTechProfileModel.init(self.userId);

          self._userService.getUserById(self.userId).then((data) => {
                   self.user = data;
           })

		})
	}

	getUserName() {
		return this.user && this.user['name'];
	}

	onPastViewBtnClicked() {
		let self = this;
		self._router.navigate(['/user-tech-profile/' + self.userId + '/past']);
	}

	onBackBtnClicked() {
		this._userTechProfileModel.save().then(() => {
			this._location.back();
		});
	}

	onCurrentViewBtnClicked() {
		let self = this;
		self._router.navigate(['/user-tech-profile/' + self.userId + '/present']);
	}
}
