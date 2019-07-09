import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { QuestionService } from '../../_services/question.service';
import { TechProfileModelService } from '../../_services/tech-profile-model.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.page.html',
  styleUrls: ['./question-edit.page.scss'],
})
export class QuestionEditPage implements OnInit {

	questionId = undefined;
	question = undefined;
	lilvassociations = undefined;
	associatedLineItems = undefined;
	addedAssociatedLineItems = undefined;
	isAddingLILV = false;

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _questionService: QuestionService,
			    private _techProfileModelService: TechProfileModelService) {

	}

	ngOnInit() {
		let self = this;

		self._techProfileModelService._init();

		self._route.params.subscribe((params) => {
			self.questionId = params['questionId'];

			if (self.questionId) {
				if (self.questionId === 'new') {
					self.question = {id: -1, text: ''};
				} else {
					self._questionService.getQuestionById(self.questionId).then((q) => {
						self.question = q[0];
					});

					self._questionService.getLineItemLevelAssociations(self.questionId).then((data: number[]) => {
						self.lilvassociations = data;
						let associatedLineItems = [];
						self.addedAssociatedLineItems = undefined;

						data.forEach((elem) => {
							let li = self._techProfileModelService.getTechProfileLineItemById(elem[0]);
							associatedLineItems.push(li);
						})

						self.associatedLineItems = associatedLineItems;
					})
				}
			}
		});
	}

	getQuestionText() {
		return this.question && this.question["text"];
	}

	onSaveBtnPressed() {
		console.log("Question Edit Save btn pressed!");
	}

	hasLineItemLevelAssociations() {
		return this.associatedLineItems && this.associatedLineItems.length > 0;
	}

	getLineItemLevelAssociations() {
		return this.associatedLineItems;
	}

	getUnassociatedLineItems() {
	
	}

	isAddingLineItemLevelAssociation() {
		return this.isAddingLILV;
	}

	onAddLineItemLevelAssociationBtnClicked() {
		this.isAddingLILV = true;
	}

	getScore(lineItemId) {
		let assoc = this.lilvassociations.find((elem) => { return elem[0] === lineItemId; });

		return assoc[1];
	}

	getBackgroundColor(lineItemId, idx) {
		let score = this.getScore(lineItemId);
		if (score === idx) return "lightblue"; else return "white";
	}

	onLxDescriptionClick(lineItemId, idx) {
		let assoc = this.lilvassociations.find((elem) => { return elem[0] === lineItemId; });
		assoc[1] = idx;
	}


	// WILO.. Next, add new li/lv associations.. Click on the add button, should see a list of all the line items that are not currently associated with this question. I select one, and it adds the id to a collection. Displays it normally, the next step is select the level. then implement saving.


}