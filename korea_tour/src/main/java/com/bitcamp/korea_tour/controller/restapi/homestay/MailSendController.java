package com.bitcamp.korea_tour.controller.restapi.homestay;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class MailSendController {
	
	@Autowired
	private JavaMailSender mailSender;
	
	
	/**
	 * 승인메일
	 * @param email1
	 * @param email2
	 */
	@PostMapping("/mailsend1")
	public void mailsend1(
			@RequestParam String email1,
			@RequestParam String email2		
			)
	{
		MimeMessage message=mailSender.createMimeMessage();

	
		
		try {
			//메일제목
			message.setSubject("귀하의 호스트 신청이 승인 되었습니다.");
			//메일 본문
			message.setText("내용 내용 내용 내용");
			//받을 메일 주소
			message.setRecipients(MimeMessage.RecipientType.TO,
					InternetAddress.parse(email1+"@"+email2));
			//메일전송
			mailSender.send(message);
			//포워드파일로 메세지 보내기
		} catch (MessagingException e) 	{
		
		}
	
	}
	
	
	/**
	 * 거절 메일
	 * @param email1
	 * @param email2
	 */
	
	@PostMapping("/mailsend2")
	public void mailsend2(
			@RequestParam String email1,
			@RequestParam String email2		
			)
	{
		MimeMessage message=mailSender.createMimeMessage();

	
		
		try {
			//메일제목
			message.setSubject("귀하의 호스트 신청이 거절 되었습니다.");
			//메일 본문
			message.setText("내용 내용 내용 내용");
			//받을 메일 주소
			message.setRecipients(MimeMessage.RecipientType.TO,
					InternetAddress.parse(email1+"@"+email2));
			//메일전송
			mailSender.send(message);
			//포워드파일로 메세지 보내기
		} catch (MessagingException e) 	{
		
		}
	
	}
}
	

