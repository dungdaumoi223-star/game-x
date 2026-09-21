import React from 'react';
import { X, Sparkles, AlertTriangle, ShieldCheck, Coins, HelpCircle } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-amber-500/80 rounded-3xl shadow-2xl p-6 text-slate-100 max-h-[90vh] overflow-y-auto space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 mb-1 border border-amber-500/30">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-xl sm:text-2xl font-black text-amber-200">
            HƯỚNG DẪN LUẬT CHƠI MATH RUNE
          </h3>
          <p className="text-xs text-slate-400">
            Chiến thuật thử vận may (Push-Your-Luck) kết hợp kiến thức Toán Học
          </p>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          {/* Section 1: Push-Your-Luck */}
          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
              <span>🃏 1. Rút Bài (Draw) & Giải Toán</span>
            </h4>
            <p>
              Khi đến lượt, bạn bấm <strong>[RÚT BÀI]</strong> để rút một lá từ bộ 60 lá bài. Lá bài mang 1 trong 10 Hệ Toán Học (Nguyên Tố, Số Âm, Phân Số, v.v.) và một câu hỏi tương ứng.
            </p>
            <p className="text-emerald-400 font-semibold">
              ✓ Giải đúng: Lá bài được đặt lên bàn, bạn tích lũy điểm thưởng của lá bài vào Điểm Lượt Này.
            </p>
          </div>

          {/* Section 2: Bust */}
          <div className="p-3.5 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-1.5">
            <h4 className="font-bold text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>💥 2. Cơ Chế BUST (Nổ / Thất Bại)</span>
            </h4>
            <p>
              Nếu bạn rút trúng một lá bài có <strong>CÙNG HỆ TOÁN HỌC</strong> với bất kỳ lá bài nào đang có trên bàn trong lượt đó:
            </p>
            <p className="text-rose-300 font-bold">
              → Bạn bị BUST! Mất toàn bộ điểm số của lượt hiện tại và bị chuyển lượt sang đối thủ!
            </p>
            <p className="text-slate-400 text-[11px]">
              * Mẹo: Càng có nhiều lá trên bàn, nguy cơ rút trùng hệ càng cao. Hãy cân nhắc dừng lại đúng lúc!
            </p>
          </div>

          {/* Section 3: Bank */}
          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>🏦 3. Giữ Điểm An Toàn (BANK)</span>
            </h4>
            <p>
              Bất kỳ lúc nào sau khi giải xong câu hỏi, bạn có thể bấm <strong>[BANK]</strong>. Toàn bộ điểm lượt này sẽ được cộng vĩnh viễn vào <strong>Kho Điểm An Toàn</strong> của bạn (không bao giờ bị mất bởi Bust).
            </p>
            <p className="text-amber-200 font-bold">
              👑 Người đầu tiên đạt 150 điểm an toàn sẽ giành CHIẾN THẮNG TRẬN ĐẤU!
            </p>
          </div>

          {/* Section 4: Runes */}
          <div className="p-3.5 bg-indigo-950/40 rounded-2xl border border-indigo-900/60 space-y-1.5">
            <h4 className="font-bold text-indigo-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>🔮 4. Ma Thuật Cổ Ngữ Rune (Trang Bị 1 Rune Duy Nhất)</span>
            </h4>
            <p>
              Trước khi vào trận, pháp sư được chọn trang bị <strong>duy nhất 1 lá Rune</strong> từ 16 Cổ Ngữ ma pháp để bảo hộ bản thân:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li><strong>Rune Khiên Chắn:</strong> Tự động vô hiệu hóa 1 lần BUST nếu rút trùng hệ.</li>
              <li><strong>Rune Hồi Sinh:</strong> Tự động kích hoạt khi BUST để giữ toàn bộ điểm lượt đó.</li>
              <li><strong>Rune Ngưng Đọng:</strong> Kéo dài thêm thời gian giải toán cho câu hỏi khó.</li>
              <li><strong>Rune Cường Hóa:</strong> Gấp đôi điểm số của lá bài tiếp theo.</li>
            </ul>
          </div>

          {/* Section 5: Customization */}
          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
              <span>🎨 5. Tùy Chỉnh Màu Nền & Xem Tác Dụng Lá Bài</span>
            </h4>
            <p>
              • <strong>Đổi Màu Nền:</strong> Bấm nút 🎨 <strong>[Đổi Nền]</strong> trên thanh Menu trên cùng để chọn giữa 6 không gian ma thuật (Hư Không, Cung Điện Tím, Rừng Ma Pháp, Huyết Nguyệt, Hải Triều, Cổ Thư).
            </p>
            <p>
              • <strong>Tác Dụng Lá Bài:</strong> Trong trận hoặc tại Thư Viện Bài, bạn có thể nhấp vào bất kỳ lá bài nào để xem toàn bộ <strong>Kỹ Năng & Tác Dụng Chi Tiết</strong> của lá bài đó!
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 text-slate-950 font-bold text-xs rounded-xl uppercase tracking-wider shadow"
        >
          Tôi Đã Hiểu Luật Chơi
        </button>
      </div>
    </div>
  );
};
